package com.store.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.app.Dto.UserDto;
import com.store.app.bean.Customer;
import com.store.app.bean.OrderDetails;
import com.store.app.bean.Products;
import com.store.app.bean.Vendor;
import com.store.app.config.UserAuthenticationProvider;
import com.store.app.service.VendorService;

@RestController
@RequestMapping("/vendor")

public class VendorController {
	
	@Autowired
	VendorService vendorService;
	

	@Autowired
    private  UserAuthenticationProvider userAuthenticationProvider;
	
	@PostMapping("/vendorlogin")
	
	public UserDto loginAuthenticate(@RequestBody Vendor vendor)
	{
//		System.out.println("inside login "+vendor.getUsername()+","+vendor.getPassword());
//		System.out.println(vendorService.vendorLogin(.getUsername(), user.getPassword()));

		Vendor vend= vendorService.vendorLogin(vendor.getUsername(), vendor.getPassword());
		if(vend != null) {
			UserDto userDto=new UserDto();
		  userDto.setFirstName(vend.getFirstname());
		  userDto.setLastName(vend.getLastname());
		  userDto.setUsername(vend.getUsername());
		   userDto.setToken( userAuthenticationProvider.createToken(userDto));
		   return userDto;
		   
			}
		return null;
	}
@PostMapping("/vendorRegister")
public Vendor vendorRegister(@RequestBody Vendor vendor) {
	
	System.out.println(vendor);
	return vendorService.addVendor(vendor);
}
@GetMapping("/getuser/{username}")
public Vendor getUser(@PathVariable String username) {
	return vendorService.getUserByUsername(username);
}
@PostMapping("/update")
public int update(@RequestBody Vendor vendor) {
		return vendorService.update(vendor);
	}

	@PostMapping("/forgotpass")
	public int forgotpassword(@RequestParam String username, @RequestParam String email)
	{
		return vendorService.getByEmail(username, email);
	}
	@PostMapping("/changepass")
	public boolean changePassword(@RequestParam String username, @RequestParam String password)
	{
		return vendorService.changePassword(username, password);
	}
	
	@GetMapping("/getProducts/{username}")
	public List<Products> getVendorProducts(@PathVariable String username){
		return vendorService.getVendorProducts(username);
	}
	
	@GetMapping("/getVendors")
	public List<Vendor> getAllVendors()
	{
		return vendorService.getAllVendors();
	}

} 
