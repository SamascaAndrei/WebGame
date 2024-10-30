package com.example.springboot.game.Repositories;
import com.example.springboot.game.Objects.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findUserByUsername(String username);
    Optional<User> findById(String id);
    User findFirstByUsernameAndPassword(String username,String password);


}
