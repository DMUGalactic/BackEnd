package com.PangaeaOdyssey.PangaeaOdyssey.handler;
import com.PangaeaOdyssey.PangaeaOdyssey.Enum.Role;
import com.PangaeaOdyssey.PangaeaOdyssey.Oauth2.CustomOAuth2User;
import com.PangaeaOdyssey.PangaeaOdyssey.Repository.MemberRepository;
import com.PangaeaOdyssey.PangaeaOdyssey.Service.JwtService;
import com.PangaeaOdyssey.PangaeaOdyssey.Service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenValidity;
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");

        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            String email = oAuth2User.getEmail();  // 이메일 가져오기

            // 사용자의 역할을 GUEST에서 USER로 변경
            memberRepository.findByEmail(oAuth2User.getEmail()).ifPresent(user -> {
                user.authorizeUser();  // 역할을 USER로 설정
                memberRepository.save(user);
                log.info("사용자의 역할이 USER로 변경되었습니다. 이메일: {}", oAuth2User.getEmail());
            });

            // Access Token 및 Refresh Token 발급
            String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
            String refreshToken = jwtService.createRefreshToken();

            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken); // 응답 헤더에 AccessToken, RefreshToken 실어서 응답

            // 로그인 성공 시 Refresh Token을 Redis에 저장
            redisTemplate.opsForValue().set("RT:" + email, refreshToken, refreshTokenValidity, TimeUnit.MILLISECONDS);

            // 사용자 객체에 리프레시 토큰 저장
            memberRepository.findByEmail(oAuth2User.getEmail()).ifPresent(user -> {
                user.updateRefreshToken(refreshToken);
                memberRepository.save(user);
                log.info("리프레시 토큰이 사용자 객체에 저장되었습니다. 이메일: {}, 리프레시 토큰: {}", oAuth2User.getEmail(), refreshToken);
            });

            // Access Token 및 Refresh Token 응답 헤더에 추가
            jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
            response.sendRedirect("/home");  // 홈 페이지로 리다이렉트
        } catch (Exception e) {
            log.error("OAuth2 로그인 성공 후 처리 중 오류 발생: {}", e.getMessage(), e);
            throw new ServletException("로그인 후 처리 중 문제가 발생했습니다.", e);
        }
    }

    // TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);

        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
    }
}