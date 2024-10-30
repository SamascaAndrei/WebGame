package com.example.springboot.game.Services;

import com.example.springboot.game.Objects.Location;
import com.example.springboot.game.Repositories.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LocationService {


    private static LocationService instance=null;

    public static synchronized LocationService getInstance()
    {
        if (instance == null)
            instance = new LocationService();

        return instance;
    }

    @Autowired
    private LocationRepository repository;

    public List<Location> findAllLocations() {
        return repository.findAll();
    }

    @Transactional
    public Location updateLocation(Location location,String id){
        Location updateLocation=findLocationById(id).orElseThrow(RuntimeException::new);
        updateLocation.setName(location.getName());
        repository.save(updateLocation);
        return updateLocation;
    }

    public void deleteLocation(String id){
        Location deletelocation=findLocationById(id).orElseThrow(RuntimeException::new);
        repository.delete(deletelocation);
    }

    public Location insertLocation(Location location){
        return repository.insert(location);
    }

    public Optional<Location> findLocationById(String id) {
        return repository.findById(id);
    }

}
