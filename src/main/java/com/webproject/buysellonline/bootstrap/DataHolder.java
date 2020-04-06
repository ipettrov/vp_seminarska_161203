package com.webproject.buysellonline.bootstrap;

import com.webproject.buysellonline.model.AdModel;
import com.webproject.buysellonline.model.User;
import com.webproject.buysellonline.repository.AdsRepository;
import com.webproject.buysellonline.repository.UsersRepository;
import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Getter
public class DataHolder {


    public static final List<User> users = new ArrayList<>();

    public static final List<AdModel> adModels = new ArrayList<>();

    public final UsersRepository usersRepository;

    public final AdsRepository adsRepository;

    public DataHolder(UsersRepository usersRepository, AdsRepository adsRepository) {
        this.usersRepository = usersRepository;
        this.adsRepository = adsRepository;
    }

    @PostConstruct
    public void init() {

        User user = new User();
        user.setUsername("user");
        user.setPassword("user");
        user.setEmail("user@gmail.com");
        user.setName("Илија Петров");
        users.add(user);

        AdModel adModel = new AdModel();
        adModel.setPrice("2 440 000");
        adModel.setImage("1");
        adModel.setLocation("Скопје");
        adModel.setPhoneNumber("078123456");
        adModel.setDescription("Се продава BMW Series 3 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel.setTitle("Се продава BMW Series 3");
        adModel.setUser(user);
        adModel.setDateCreated(new Date());
        adModels.add(adModel);

        AdModel adModel1 = new AdModel();
        adModel1.setPrice("2 440 000");
        adModel1.setImage("2_bmw_m5");
        adModel1.setLocation("Скопје");
        adModel1.setPhoneNumber("078123456");
        adModel1.setDescription("Се продава BMW M5 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel1.setTitle("Се продава BMW M5");
        adModel1.setUser(user);
        adModel1.setDateCreated(new Date());
        adModels.add(adModel1);

        AdModel adModel2 = new AdModel();
        adModel2.setPrice("2 440 000");
        adModel2.setImage("3_bmw_m5");
        adModel2.setLocation("Скопје");
        adModel2.setPhoneNumber("078123456");
        adModel2.setDescription("Се продава BMW M5 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel2.setTitle("Се продава BMW M5");
        adModel2.setUser(user);
        adModel2.setDateCreated(new Date());
        adModels.add(adModel2);

        AdModel adModel3 = new AdModel();
        adModel3.setPrice("2 440 000");
        adModel3.setImage("4_bmw_m3");
        adModel3.setLocation("Скопје");
        adModel3.setPhoneNumber("078123456");
        adModel3.setDescription("Се продава BMW M3 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel3.setTitle("Се продава BMW M3");
        adModel3.setUser(user);
        adModel3.setDateCreated(new Date());
        adModels.add(adModel3);

        AdModel adModel4 = new AdModel();
        adModel4.setPrice("2 440 000");
        adModel4.setImage("a6");
        adModel4.setLocation("Скопје");
        adModel4.setPhoneNumber("078123456");
        adModel4.setDescription("Се продава Audi A6 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel4.setTitle("Се продава Audi A6");
        adModel4.setUser(user);
        adModel4.setDateCreated(new Date());
        adModels.add(adModel4);

        AdModel adModel5 = new AdModel();
        adModel5.setPrice("2 440 000");
        adModel5.setImage("a8");
        adModel5.setLocation("Скопје");
        adModel5.setPhoneNumber("078123456");
        adModel5.setDescription("Се продава Audi A8 сочувано и до одлична состојба. Купено 2019 година, увезено од Германија. \nПрв сопственик го продавам поради лични причини за повеќе информации контактирајте ме на мојот мобилен телефон.");
        adModel5.setTitle("Се продава Audi A8");
        adModel5.setUser(user);
        adModel5.setDateCreated(new Date());
        adModels.add(adModel5);

        // Initial save of all objects in relational database
        if (this.usersRepository.count() == 0) {
            usersRepository.save(user);
        }

        if (this.adsRepository.count() == 0) {
            adsRepository.saveAll(adModels);
        }
    }
}
