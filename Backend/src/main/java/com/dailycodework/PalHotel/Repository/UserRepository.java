package com.dailycodework.PalHotel.Repository;


import com.dailycodework.PalHotel.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Optional;

/**
 * @author Simpson Alfred
 */

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    void deleteByEmail(String email);

    Optional<User> findByEmail(String email);
}
