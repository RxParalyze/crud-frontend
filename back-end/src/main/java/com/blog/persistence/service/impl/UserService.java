package com.blog.persistence.service.impl;

import java.util.List;

import javax.ws.rs.Produces;

import com.blog.persistence.dao.IUserDao;
import com.blog.persistence.model.User;
import com.blog.persistence.service.IUserService;
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
public class UserService extends AbstractService<User> implements IUserService {

    @Autowired
    private IUserDao dao;

    public UserService() {
        super();
    }

    @Override
    protected PagingAndSortingRepository<User, Integer> getDao() {
        return dao;
    }

    // overridden to be secured

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return Lists.newArrayList(getDao().findAll());
    }

    @Override
    public User findById(int id) {
        User findUser = getDao().findById(id).get();
        return findUser;
    }

    @Override
    public User create(User User) {
        getDao().save(User);
        return User;
    }

    @Override
    public User update(User User) {
        getDao().save(User);
        return User;
    }

    @Override
    public void delete(User User) {
        getDao().delete(User);
    }

    @Override
    public void deleteById(int UserId) {
        getDao().deleteById(UserId);
    }


    //INVALID OVERRIDES - DO NOT USE

    @Override
    public Page<User> findPaginated(Pageable pageable) {
        // INVALID. NOT APPLICABLE
        return null;
    }

    @Override
    public Page<User> findPaginated(int page, int size) {
        // INVALID. NOT APPLICABLE
        return null;
    }
}
