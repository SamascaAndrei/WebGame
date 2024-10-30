package com.example.springboot.game.Controllers;

import com.example.springboot.game.Services.ItemService;
import com.example.springboot.game.Services.LocationService;
import com.example.springboot.game.Objects.Location;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {



    private static LocationController instance=null;

    public static synchronized LocationController getInstance()
    {
        if (instance == null)
            instance = new LocationController();

        return instance;
    }

    @Autowired
    private LocationService service=LocationService.getInstance();

    @GetMapping
    public ResponseEntity<List<Location>> getLocations() {
        return new ResponseEntity<List<Location>>(service.findAllLocations(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Location>> findLocationById(@PathVariable String id) {
        return new ResponseEntity<Optional<Location>>(service.findLocationById(id), HttpStatus.OK);

    }


    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location)
    {
        return new ResponseEntity<Location>(service.insertLocation(location),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location,@PathVariable String id)
    {
        return new ResponseEntity<Location>(service.updateLocation(location,id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteLocation(@PathVariable String id)
    {
        service.deleteLocation(id);
    }
}