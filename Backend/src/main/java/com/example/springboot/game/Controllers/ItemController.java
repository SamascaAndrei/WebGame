package com.example.springboot.game.Controllers;

import com.example.springboot.game.Objects.ItemDataRequest;
import com.example.springboot.game.Services.ItemService;
import com.example.springboot.game.Objects.Item;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {

    private static ItemController instance=null;

    public static synchronized  ItemController getInstance()
    {
        if (instance == null)
            instance = new ItemController();

        return instance;
    }

    @Autowired
    private ItemService service=ItemService.getInstance();

    @GetMapping
    public ResponseEntity<List<Item>> getItems() {
        return new ResponseEntity<List<Item>>(service.findAllItems(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Item>> findItemById(@PathVariable String id) {
        return new ResponseEntity<Optional<Item>>(service.findItemById(id), HttpStatus.OK);

    }


    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        return new ResponseEntity<Item>(service.createItem(item), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@RequestBody Item item, @PathVariable String id) {

        return new ResponseEntity<Item>(service.updateItem(item, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    void deleteLocation(@PathVariable String id) {
        service.deleteItem(id);
    }

}

