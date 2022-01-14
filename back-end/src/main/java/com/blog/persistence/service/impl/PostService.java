package com.blog.persistence.service.impl;

import java.util.List;

import javax.ws.rs.Produces;

import com.blog.persistence.dao.IPostDao;
import com.blog.persistence.model.Post;
import com.blog.persistence.service.IPostService;
import com.blog.persistence.service.common.AbstractService;
import com.google.common.collect.Lists;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@Produces({"application/json", "application/xml"})
@Component
public class PostService extends AbstractService<Post> implements IPostService {

    @Autowired
    private IPostDao dao;

    public PostService() {
        super();
    }

    //blog

    @Override
    protected PagingAndSortingRepository<Post, Integer> getDao() {
        return dao;
    }

    // overridden to be secured

    @Override
    @Transactional(readOnly = true)
    public List<Post> findAll() {
        return Lists.newArrayList(getDao().findAll());
    }

    @Override
    public Post findById(int id) {
        Post findPost = getDao().findById(id).get();
        return findPost;
    }

    @Override
    public Post create(Post Post) {
        getDao().save(Post);
        return Post;
    }

    @Override
    public Post update(Post Post) {
        getDao().save(Post);
        return Post;
    }

    @Override
    public void delete(Post Post) {
        getDao().delete(Post);
    }

    @Override
    public void deleteById(int PostId) {
        getDao().deleteById(PostId);
    }


    //INVALID OVERRIDES - DO NOT USE

    @Override
    public Page<Post> findPaginated(Pageable pageable) {
        // INVALID. NOT APPLICABLE
        return null;
    }

    @Override
    public Page<Post> findPaginated(int page, int size) {
        // INVALID. NOT APPLICABLE
        return null;
    }
}
