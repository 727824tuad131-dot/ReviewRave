package com.example.demo.repository;

import com.example.demo.entity.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {

    List<CustomerReview> findByRating(int rating);

    List<CustomerReview> findByReviewerName(String reviewerName);

}