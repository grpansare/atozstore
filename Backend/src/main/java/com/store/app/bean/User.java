package com.store.app.bean;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "app_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    @Size(max = 1000)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @Size(max = 1000)
    private String lastName;

    @Column(nullable = false)
    @Size(max = 1000)
    private String login;

    @Column(nullable = false)
    @Size(max = 3000)
    private String password;
    
    @Transient
 
    private String token=null;
}
