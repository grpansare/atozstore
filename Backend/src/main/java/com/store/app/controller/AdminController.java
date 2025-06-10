package com.store.app.controller;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.app.Dto.UserDto;
import com.store.app.bean.Admin;
import com.store.app.bean.DeliveryPartner;
import com.store.app.bean.Vendor;
import com.store.app.config.UserAuthenticationProvider;
import com.store.app.service.DeliveryPartnerService;
import com.store.app.service.VendorService;


@RestController
@RequestMapping("/admin")

public class AdminController 
{
	@Value("${usernm}")
	private String adUsername;
	
	@Value("${userpsd}")
	private String adPassword;
	
	@Autowired
	private DeliveryPartnerService deliveryPartnerService;
	
	@Autowired
	private VendorService vendorService;

	@Autowired
    private  UserAuthenticationProvider userAuthenticationProvider;

	  @PostMapping("/adminAuthentication")
	  
	  public ResponseEntity<UserDto> adminLogin(@RequestBody Admin admin) {
		    // Assuming adUsername and adPassword are instance variables in the class
		    System.out.println(admin);
		    System.out.println(adUsername + " :&: " + adPassword);
		    
		    // Perform authentication logic here
		    if (adUsername.equals(admin.getUsername()) && adPassword.equals(admin.getPassword())) {
		        UserDto userDto = new UserDto();
		        userDto.setUsername(admin.getUsername());
		        userDto.setToken(userAuthenticationProvider.createToken(userDto));
		        return ResponseEntity.ok().body(userDto);
		    } else {
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		    }
		}
	  
	  @PostMapping("/deliveryStatus")
	  public boolean changeDeliveryStatus(@RequestBody DeliveryPartner deliveryPartner)
	  {
		  System.out.println(deliveryPartner);
		  return deliveryPartnerService.changeStatus(deliveryPartner.getUsername(), deliveryPartner.getStatus());
	  }
	  
	  @PostMapping("/vendorStatus")
	  public boolean changeVendorStatus(@RequestBody Vendor vendor)
	  {
		  System.out.println(vendor);
		  return vendorService.changeStatus(vendor.getUsername(), vendor.getStatus());
	  }
	  
}
