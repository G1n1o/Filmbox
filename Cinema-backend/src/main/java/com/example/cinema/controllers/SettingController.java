package com.example.cinema.controllers;

import com.example.cinema.services.SettingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/settings")
public class SettingController {

    private final SettingService settingService;

    public SettingController(SettingService settingService) {
        this.settingService = settingService;
    }

    @GetMapping("/ticket-price")
    public String getTicketPrice() {
        return settingService.getValue("ticket_price");
    }

    @PutMapping("/ticket-price")
    public ResponseEntity<?> updateTicketPrice(@RequestBody Map<String, String> body) {
        String value = body.get("value");
        if (value == null || value.isEmpty()) {
            return ResponseEntity.badRequest().body("Value cannot be empty");
        }
        settingService.updateTicketPrice(value);
        return ResponseEntity.ok().build();
    }
}
