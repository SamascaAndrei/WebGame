package com.example.springboot.game.Repositories;

import com.example.springboot.game.Objects.Admin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, ObjectId> {
    Optional<Admin> findAdminByUsername(String username);
    Optional<Admin> findById(String objectId);

}