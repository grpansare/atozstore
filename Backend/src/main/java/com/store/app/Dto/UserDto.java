package com.store.app.Dto;

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String token;
   
    public UserDto() {
		super();
	}

	// Private constructor for Builder
    private UserDto(Builder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.username = builder.username;
        this.token = builder.token;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    
    public void setId(Long id) {
		this.id = id;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setToken(String token) {
		this.token = token;
	}


	// Static Builder Class
    public static class Builder {
        private Long id;
        private String firstName;
        private String lastName;
        private String username;
        private String token;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public UserDto build() {
            return new UserDto(this);
        }
    }


}
