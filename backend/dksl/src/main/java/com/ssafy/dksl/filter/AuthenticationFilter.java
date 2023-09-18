package com.ssafy.dksl.filter;

import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.InvalidTokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// 여기서 UsernamePasswordAuthenticationToken 생성
// UsernamePasswordAuthenticationToken : 인증용 객체 생성
@Component
public class AuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public AuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwtUtil.resolveToken(request);

        try {
            if (jwtUtil.validateToken(token)) {
                Authentication authentication = jwtUtil.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (InvalidTokenException e) {
            errorResponse(request, response, e);
        }
        filterChain.doFilter(request, response);
    }

    private void errorResponse(HttpServletRequest request, HttpServletResponse response, InvalidTokenException e) throws IOException {
        response.setStatus(HttpStatus.SC_BAD_REQUEST);
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(e.getMessage());
    }
}
