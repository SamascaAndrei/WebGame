package com.example.springboot.game.Services;

import com.example.springboot.game.Objects.*;
import com.example.springboot.game.Repositories.ItemRepository;
import com.example.springboot.game.Repositories.LocationRepository;
import com.example.springboot.game.Repositories.MonsterRepository;
import com.example.springboot.game.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class UserService {



    private static UserService instance=null;

    public static synchronized UserService getInstance()
    {
        if (instance == null)
            instance = new UserService();

        return instance;
    }

    @Autowired
    LocationRepository locationRepository;
    @Autowired
    MonsterRepository monsterRepository;
    @Autowired
    private UserRepository repository;
    @Autowired
    private ItemRepository itemRepository;

    public UserService(UserRepository userRepository, MongoTemplate mongoTemplate) {
        this.repository = userRepository;
    }

    public List<User> findAllUsers() {
        return repository.findAll();
    }

    public Optional<User> findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    @Transactional
    public User updateUser(User user, String id) {
        User updateduser = findUserById(id).orElseThrow(RuntimeException::new);
        updateduser.setUsername(user.getUsername());
        updateduser.setPassword(user.getPassword());
        updateduser.setGold(user.getGold());
        updateduser.setCurrentLocation(user.getCurrentLocation());
        repository.save(updateduser);
        return updateduser;
    }

    public void deleteUser(String id) {
        User deleteduser = findUserById(id).orElseThrow(RuntimeException::new);
        repository.delete(deleteduser);
    }

    public User insertUser(User user) {

        if (locationRepository.findLocationByName("Start").isPresent()) {
            user.setCurrentLocation(locationRepository.findLocationByName("Start").get());
            user.setGold(100);

            return repository.insert(user);
        } else
            return null;
    }

    public Optional<User> findUserById(String id) {
        return repository.findById(id);
    }

    public User findFirstByUsernameAndPassword(User user) {
        return repository.findFirstByUsernameAndPassword(user.getUsername(), user.getPassword());
    }

//    public void chestie() {
//        var map = new ArrayList<DropItem>();
//        Item blana = itemRepository.findById("6460f04503420820d80e077a").get();
//        map.add(new DropItem(blana, 0.5));
//        Monster mon = new Monster(null, "luo", 1, 1, 1, null, map);
//        monsterRepository.insert(mon);
//    }

    public List<Item> kill(String userID, String monsterID) {
        User user;
        if (repository.findById(userID).isPresent())
            user = repository.findById(userID).get();
        else
            return null;
        Monster monster;
        if (monsterRepository.findById(monsterID).isPresent())
            monster = monsterRepository.findById(monsterID).get();
        else
            return null;

        var drops = monster.getDropTable();
        Random random = new Random();
        List<Item> items = drops.stream().filter(di -> di.getDropChance() > random.nextDouble()).map(DropItem::getItem).toList();
        List<Item> userItems = user.getItems();
        for (Item item : items) {
            var optionalResource = userItems.stream().filter((Item i) -> i.isResource() && i.getId().equals(item.getId())).findFirst();
            optionalResource.ifPresentOrElse(
                    resource -> {
                        resource.setAmount(resource.getAmount() + 1);
                        itemRepository.save(resource);
                    },
                    () -> userItems.add(item)
            );
        }

        repository.save(user);

        return items;
    }

    public User addItem(String userID,String itemID)
    {
        User user=repository.findById(userID).get();
        Item updateItem;
        List<Item> userItems = user.getItems();
        for (Item item : userItems) {
            if(item.getId().equals(itemID)) {
                item.setAmount(item.getAmount()+1);
                itemRepository.save(item);
                return user;

            }
        }
        updateItem = itemRepository.findById(itemID).get();
        userItems.add(updateItem);
        repository.save(user);
        return user;
    }

    public User changeLocation(String userID,String locationID)
    {
        User user=repository.findById(userID).get();
        Location location=locationRepository.findById(locationID).get();
        user.setCurrentLocation(location);
        repository.save(user);
        return user;
    }
}
