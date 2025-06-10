package com.store.app.controller;

import java.util.List;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.store.app.Dto.UserDto;
import com.store.app.bean.Customer;
import com.store.app.config.UserAuthenticationProvider;
import com.store.app.service.CustomerService;


import com.store.app.service.CustomerService;



@RestController
@RequestMapping("/user")

public class CustomerController 
{
	

	@Autowired
	private CustomerService customerService;
	
	@Autowired
    private  UserAuthenticationProvider userAuthenticationProvider;
	

	
	@PostMapping("/loginuser")

	public UserDto loginAuthenticate(@RequestBody Customer customer)
	{
		System.out.println("inside login "+customer.getUsername()+","+customer.getPassword());

	Customer customer2= customerService.loginUser(customer.getUsername(), customer.getPassword());
	if(customer2 != null) {
	UserDto userDto=new UserDto();
  userDto.setFirstName(customer2.getFirstname());
  userDto.setLastName(customer2.getLastname());
  userDto.setUsername(customer2.getUsername());
   userDto.setToken( userAuthenticationProvider.createToken(userDto));
   return userDto;
	}
	return null;
  

	}
	
	
	@PostMapping("/newuser")
	public void registerUser(@RequestBody Customer user)
	{
		System.out.println("inside registration "+user);
		customerService.registerUser(user);
	}
	
	
	
	@PostMapping("/forgotpass")
	public int forgotpassword(@RequestParam String username, @RequestParam String email)
	{
		return customerService.getByEmail(username, email);
	}
	
	@PostMapping("/changepass")
	public boolean changePassword(@RequestParam String username, @RequestParam String password)
	{
		return customerService.changePassword(username, password);
	}
	

	@GetMapping("/getuser/{username}")
	public Customer getUserDetails(@PathVariable("username") String username)
	{
		System.out.println(username);
		return customerService.getUser(username);
	}
	
	@PostMapping("/updateuser")
	public void updateUserDetails(@RequestBody Customer user)
	{
		customerService.updateUser(user);
	}
	
	@GetMapping("/getAllCustomers")
	public List<Customer> getAllCustomers()
	{     
		System.out.println("in get all customers");
		return customerService.getAllCustomers();
	}
		
		
		
		

	
	


	
}
