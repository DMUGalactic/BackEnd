package com.PangaeaOdyssey.PangaeaOdyssey.handler;

import com.PangaeaOdyssey.PangaeaOdyssey.Repository.MemberRepository;
import com.PangaeaOdyssey.PangaeaOdyssey.Service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class LogoutFilter extends GenericFilterBean {
    private final MemberRepository userRepository;
    private final JwtService jwtService;
    public LogoutFilter(MemberRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // path and method verify
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("^/logout$")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        // get refresh token from header
        String refreshToken = request.getHeader("Refresh-Token");

        // refresh null check
        if (refreshToken == null || refreshToken.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // expired check
        try {
            jwtService.isTokenValid(refreshToken);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // token category verification (check if it's refresh token)
        String category = jwtService.getCategory(refreshToken);
        if (!"refresh".equals(category)) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // check if token exists in DB
        boolean isExist = userRepository.existsByRefresh(refreshToken);
        if (!isExist) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        // logout process
        // remove refresh token from DB
        userRepository.deleteByRefresh(refreshToken);

        // respond with success status
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
