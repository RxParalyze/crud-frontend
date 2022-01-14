package com.blog.persistence.dao;

import com.blog.persistence.model.Post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IPostDao extends JpaRepository<Post, Integer> {

}
