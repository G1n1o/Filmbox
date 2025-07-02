package com.example.cinema.services;

import com.example.cinema.dao.SettingRepository;
import com.example.cinema.entity.Setting;
import org.springframework.stereotype.Service;

@Service
public class SettingService {


    private final SettingRepository settingRepository;

    public SettingService(SettingRepository settingRepository) {
        this.settingRepository = settingRepository;
    }

    public String getValue(String name) {
        return settingRepository.findByName(name)
                .map(Setting::getValue)
                .orElse(null);
    }

    public void updateTicketPrice(String value) {
        settingRepository.findByName("ticket_price")
                .map(setting -> {
                    setting.setValue(value);
                    return settingRepository.save(setting);
                })
                .orElseGet(() -> {
                    Setting newSetting = new Setting();
                    newSetting.setName("ticket_price");
                    newSetting.setValue(value);
                    return settingRepository.save(newSetting);
                });
    }
}
