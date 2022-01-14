package com.blog.persistence.dao;

import com.blog.persistence.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserDao extends JpaRepository<User, Integer> {

}
