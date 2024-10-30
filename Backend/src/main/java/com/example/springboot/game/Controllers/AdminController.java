package com.example.springboot.game.Controllers;

import com.example.springboot.game.Objects.Admin;
import com.example.springboot.game.Services.AdminService;
import com.example.springboot.game.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

    private static AdminController instance=null;

    public static synchronized  AdminController getInstance()
    {
        if (instance == null)
            instance = new AdminController();

        return instance;
    }

    @Autowired
    private AdminService service=AdminService.getInstance();

    @GetMapping
    public ResponseEntity<List<Admin>> getAdmins() {
        return new ResponseEntity<List<Admin>>(service.findAllAdmins(), HttpStatus.OK);
    }
    /*
        @GetMapping("/{username}")
        public ResponseEntity<Optional<User>> getSingleUser(@PathVariable String username) {
            return new ResponseEntity<Optional<User>>(service.findUserByUsername(username), HttpStatus.OK);

        }
    */
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Admin>> findAdminById(@PathVariable String id) {
        return new ResponseEntity<Optional<Admin>>(service.findAdminById(id), HttpStatus.OK);

    }


    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin)
    {
        return new ResponseEntity<Admin>(service.insertAdmin(admin),HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@RequestBody Admin admin, @PathVariable String id)
    {
        return new ResponseEntity<Admin>(service.updateAdmin(admin,id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteAdmin(@PathVariable String id)
    {
        service.deleteAdmin(id);
    }
}