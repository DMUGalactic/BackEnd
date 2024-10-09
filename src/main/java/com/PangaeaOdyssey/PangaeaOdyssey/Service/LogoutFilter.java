package com.PangaeaOdyssey.PangaeaOdyssey.Service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class LogoutFilter  extends GenericFilterBean {
    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String username = httpRequest.getParameter("username");

        if (username != null) {
            // 로그아웃 요청 시 Refresh Token 삭제
            String redisKey = "RT:" + username;
            if (redisTemplate.hasKey(redisKey)) {
                redisTemplate.delete(redisKey);
            }
        }

        chain.doFilter(request, response);
    }
}
