package com.dailycodework.PalHotel.Service;


import com.dailycodework.PalHotel.Model.User;

import java.util.List;

/**
 * @author Simpson Alfred
 */

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}