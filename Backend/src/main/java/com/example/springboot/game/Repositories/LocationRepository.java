package com.example.springboot.game.Repositories;

import com.example.springboot.game.Objects.Location;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends MongoRepository<Location,String> {

    Optional<Location> findById(String objectId);

    Optional<Location> findLocationByName(String name);

}
