package com.example.book.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "BOOK")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String description;
    private Integer chulpan;
    private String  publisher;

    // 기본 생성자, getter, setter
    public Book() {
    }

    public Book(String title, String author, String description, Integer chulpan, String publisher) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.chulpan = chulpan;
        this.publisher = publisher;
    }

    // getter, setter methods...
}
