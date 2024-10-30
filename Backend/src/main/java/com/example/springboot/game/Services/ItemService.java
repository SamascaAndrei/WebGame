package com.example.springboot.game.Services;

import com.example.springboot.game.Objects.Item;
import com.example.springboot.game.Repositories.ItemRepository;
import com.example.springboot.game.Objects.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
public class ItemService {

    private static ItemService instance=null;

    public static synchronized ItemService getInstance()
    {
        if (instance == null)
            instance = new ItemService();

        return instance;
    }

    @Autowired
    private ItemRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public List<Item> findAllItems() {
        return repository.findAll();
    }

    @Transactional
    public Item updateItem(Item item, String id){
        Item updateItem=findItemById(id).orElseThrow(RuntimeException::new);
        updateItem.setName(item.getName());
        repository.save(updateItem);
        return updateItem;
    }

    public void deleteItem(String id){
        Item deleteItem=findItemById(id).orElseThrow(RuntimeException::new);
        repository.delete(deleteItem);
    }


    public Item createItem(Item item)
    {
        repository.insert(item);
        return item;
    }

    public Item assignItem(Item item,String userID)
    {
        repository.insert(item);
        if(userID!=null)
            mongoTemplate.update(User.class)
                    .matching(Criteria.where("id").is(userID))
                    .apply(new Update().push("items").value(item))
                    .first();

        return item;
    }

    public Optional<Item> findItemById(String id) {
        return repository.findById(id);
    }




}

