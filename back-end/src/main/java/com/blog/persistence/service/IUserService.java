package com.blog.persistence.service;

import com.blog.persistence.IOperations;
import com.blog.persistence.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserService extends IOperations<User> {

    Page<User> findPaginated(Pageable pageable);
}
