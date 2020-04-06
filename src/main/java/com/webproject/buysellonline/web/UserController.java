package com.webproject.buysellonline.web;

import com.webproject.buysellonline.bootstrap.DataHolder;
import com.webproject.buysellonline.model.AdModel;
import com.webproject.buysellonline.model.AuthenticationRequest;
import com.webproject.buysellonline.model.User;
import com.webproject.buysellonline.repository.AdsRepository;
import com.webproject.buysellonline.repository.UsersRepository;
import com.webproject.buysellonline.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private AdsRepository adsRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    DataHolder dataHolder = new DataHolder(userRepository,adsRepository);

    @GetMapping("/")
    public String welcome() {

        return "Home !!";
    }

    @PostMapping("/authenticate")
    public ResponseEntity<String> generateToken(@RequestBody AuthenticationRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("inavalid username/password");
        }
        return new ResponseEntity<>(jwtUtil.generateToken(authRequest.getUsername()), HttpStatus.OK);
    }

    @GetMapping("/user")
    public User getUserFormToken(@RequestHeader(name = "Authorization") String token) {
        if (token == null) {
            return null;
        }

        String username = "";
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
            username = jwtUtil.extractUsername(token);
        }
        return userRepository.findByUsername(username);
    }

    //ama ja prakaj jwt
    @PostMapping(path = "/register")
    public @ResponseBody
    ResponseEntity<String> addNewUser(@RequestBody User user) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        //TODO check is email valid
        if (user.getEmail() == null || user.getEmail().length() == 0) {
            return new ResponseEntity<>("Enter email", HttpStatus.BAD_REQUEST);
        }
        if (user.getPassword() == null || user.getPassword().length() == 0) {
            return new ResponseEntity<>("Enter password", HttpStatus.BAD_REQUEST);
        }
        if (user.getUsername() == null || user.getUsername().length() == 0) {
            return new ResponseEntity<>("Enter username", HttpStatus.BAD_REQUEST);
        }
        if (user.getName() == null || user.getName().length() == 0) {
            return new ResponseEntity<>("Enter name", HttpStatus.BAD_REQUEST);
        }

        userRepository.save(user);
        return new ResponseEntity<>("Enter name", HttpStatus.OK);
    }

    @GetMapping(path = "/ads")
    public @ResponseBody
    List<AdModel> getAllAds() {
        return adsRepository.findAll();
    }

    @RequestMapping(value = "/create_ad", method = RequestMethod.POST, consumes = {"multipart/form-data"})
    public ResponseEntity<String> createAd(@RequestHeader(name = "Authorization") String token,
                                           @RequestParam("title") String title,
                                           @RequestParam("phoneNumber") String phoneNumber,
                                           @RequestParam("description") String description,
                                           @RequestParam("location") String location,
                                           @RequestParam("price") String price,
                                           @RequestPart("image") MultipartFile secret) {

        int intname = 0;
        try {
            Random random = new Random();
            intname = random.nextInt(10000000);
            secret.transferTo(new File("C:\\Users\\Ilija\\Downloads\\buysellonline (1)\\buysellonline\\frontend\\public\\images\\" + intname + ".jpg"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        String username = "";
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
            username = jwtUtil.extractUsername(token);
        }
        User user = userRepository.findByUsername(username);

        if (userRepository.findByUsername(username) == null) {
            return new ResponseEntity<>("Wrong user_id", HttpStatus.BAD_REQUEST);
        } else {
            AdModel adModel = new AdModel();
            adModel.setTitle(title);
            adModel.setDescription(description);
            adModel.setPhoneNumber(phoneNumber);
            adModel.setLocation(location);
            adModel.setDateCreated(new Date());
            adModel.setUser(user);
            adModel.setPrice(price);
            adModel.setImage(intname + "");
            adsRepository.save(adModel); //TODO treba od rest/web na service, a od service na repo
            return new ResponseEntity<>("Saved", HttpStatus.OK);
        }
    }

    @PostMapping("/ads/{id}/delete")
    public String deleteRoom(@PathVariable int id) {
        adsRepository.deleteById(id);
        return "deleted";
    }


}


