package com.webproject.buysellonline.repository;

import com.webproject.buysellonline.model.AdModel;
import com.webproject.buysellonline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdsRepository extends JpaRepository<AdModel, Integer> {

    List<AdModel> findAll();



}
