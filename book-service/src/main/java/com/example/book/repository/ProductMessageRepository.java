package com.example.book.repository;


import com.example.book.model.ProductMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductMessageRepository extends JpaRepository<ProductMessage, Long> {
    boolean existsByMessageId(String messageId);
}


