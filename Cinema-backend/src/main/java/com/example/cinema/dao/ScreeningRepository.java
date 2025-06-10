package com.example.cinema.dao;

import com.example.cinema.entity.Screening;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreeningRepository extends JpaRepository<Screening, Integer> {

    List<Screening> findByMovieId(Integer movieId);

    List<Screening> findAllByOrderByScreeningTimeAsc();

    Screening getScreeningById(Integer id);
}
