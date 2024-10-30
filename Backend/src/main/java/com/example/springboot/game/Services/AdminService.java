package com.example.springboot.game.Services;

import com.example.springboot.game.Objects.Admin;
import com.example.springboot.game.Repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    private static AdminService instance=null;

    public static synchronized AdminService getInstance()
    {
        if (instance == null)
            instance = new AdminService();

        return instance;
    }

    @Autowired
    AdminRepository repository;



    public List<Admin> findAllAdmins() {
        return repository.findAll();
    }
    public Optional<Admin> findAdminByUsername(String username) {
        return repository.findAdminByUsername(username);
    }
    @Transactional
    public Admin updateAdmin(Admin admin, String id){
        Admin updatedAdmin=findAdminById(id).orElseThrow(RuntimeException::new);
        updatedAdmin.setUsername(admin.getUsername());
        updatedAdmin.setPassword(admin.getPassword());
        repository.save(updatedAdmin);
        return updatedAdmin;
    }

    public void deleteAdmin(String id){
        Admin deletedAdmin=findAdminById(id).orElseThrow(RuntimeException::new);
        repository.delete(deletedAdmin);
    }

    public Admin insertAdmin(Admin admin){
        return repository.insert(admin);
    }

    public Optional<Admin> findAdminById(String id) {
        return repository.findById(id);
    }

}