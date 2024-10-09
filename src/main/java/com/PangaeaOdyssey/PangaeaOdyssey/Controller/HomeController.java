package com.PangaeaOdyssey.PangaeaOdyssey.Controller;

import com.PangaeaOdyssey.PangaeaOdyssey.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class HomeController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "index.html"; // index.html로 포워딩
    }
    @GetMapping("/home")
    public String homeP() {
        return "home.html";  // home.html 페이지로 이동 (src/main/resources/templates/home.html)
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody String username) {
        userService.logout(username);
        return ResponseEntity.ok("Logout successful");
    }
}
