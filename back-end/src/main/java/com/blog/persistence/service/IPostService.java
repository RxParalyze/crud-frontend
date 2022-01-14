package com.blog.persistence.service;

import com.blog.persistence.IOperations;
import com.blog.persistence.model.Post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPostService extends IOperations<Post> {

    Page<Post> findPaginated(Pageable pageable);
}
