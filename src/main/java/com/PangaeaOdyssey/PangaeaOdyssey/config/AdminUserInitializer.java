package com.PangaeaOdyssey.PangaeaOdyssey.config;

import com.PangaeaOdyssey.PangaeaOdyssey.Entity.Member;
import com.PangaeaOdyssey.PangaeaOdyssey.Enum.Role;
import com.PangaeaOdyssey.PangaeaOdyssey.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminUserInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@admin.com";
        String adminPassword = "1234";

        // 이미 존재하는지 확인 후 생성
        if (memberRepository.findByEmail(adminEmail).isEmpty()) {
            Member admin = Member.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .nickname("admin")
                    .role(Role.ADMIN)
                    .build();

            memberRepository.save(admin);
            System.out.println("Admin user created with email: " + adminEmail);
        } else {
            System.out.println("Admin user already exists. Skipping creation.");
        }
    }
}