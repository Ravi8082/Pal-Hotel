package com.dailycodework.PalHotel.Service;



import com.dailycodework.PalHotel.Model.Role;
import com.dailycodework.PalHotel.Model.User;

import java.util.List;

/**
 * @author Simpson Alfred
 */

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);

    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}