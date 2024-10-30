package com.example.springboot.game.Controllers;

import com.example.springboot.game.Objects.Item;
import com.example.springboot.game.Objects.Monster;
import com.example.springboot.game.Objects.User;
import com.example.springboot.game.Services.ItemService;
import com.example.springboot.game.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {


    private static UserController instance=null;

    public static synchronized UserController getInstance()
    {
        if (instance == null)
            instance = new UserController();

        return instance;
    }

    @Autowired
    private UserService service=UserService.getInstance();

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<List<User>>(service.findAllUsers(), HttpStatus.OK);
    }
/*
    @GetMapping("/{username}")
    public ResponseEntity<Optional<User>> getSingleUser(@PathVariable String username) {
        return new ResponseEntity<Optional<User>>(service.findUserByUsername(username), HttpStatus.OK);

    }
*/
    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> findUserById(@PathVariable String id) {
        return new ResponseEntity<Optional<User>>(service.findUserById(id), HttpStatus.OK);

    }


    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user)
    {
        return new ResponseEntity<User>(service.insertUser(user),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User user,@PathVariable String id)
    {
        return new ResponseEntity<User>(service.updateUser(user,id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteUser(@PathVariable String id)
    {
        service.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user)
    {
        return new ResponseEntity<User>(service.findFirstByUsernameAndPassword(user),HttpStatus.OK);
    }

    @GetMapping("/{id}/items")
    public ResponseEntity<List<Item>> findItems(@PathVariable String id) {
        return new ResponseEntity<List<Item>>(service.findUserById(id).get().getItems(), HttpStatus.OK);
    }

    @PutMapping("/{userID}/kill/{monsterID}")
    public ResponseEntity<List<Item>> kill (@PathVariable String userID, @PathVariable String monsterID)
    {
        return new ResponseEntity<>(service.kill(userID,monsterID),HttpStatus.OK);
    }

    @PutMapping("/{userID}/add/{itemID}")
    public ResponseEntity<User> addItem (@PathVariable String  userID, @PathVariable String itemID)
    {
        return new ResponseEntity<>(service.addItem(userID,itemID),HttpStatus.OK);
    }
    @PutMapping("/{userID}/move/{locationID}")
    public ResponseEntity<User> changeLocation (@PathVariable String  userID, @PathVariable String locationID)
    {
        return new ResponseEntity<>(service.changeLocation(userID,locationID),HttpStatus.OK);
    }
}
