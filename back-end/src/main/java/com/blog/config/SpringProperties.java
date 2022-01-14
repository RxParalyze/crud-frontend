package com.blog.config;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

//Developed from https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-external-config.html#boot-features-external-config-3rd-party-configuration

@ConfigurationProperties("spring.datasource")
public class SpringProperties {
    private boolean enabled;

	private InetAddress remoteAddress;

	private final Security security;

    private String username;

    private String password;

    public SpringProperties(){
        this.security = new Security();
    }

    public SpringProperties(String username, String password) {
        this.username = username;
        this.password = password;
        this.security = new Security(this.username, this.password);
    }

    public SpringProperties(String username, String password, List<String> roles) {
        this.username = username;
        this.password = password;
        this.security = new Security(this.username, this.password, roles);
    }

	public boolean isEnabled() {
        return enabled;
    }

	public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

	public InetAddress getRemoteAddress() {
        return this.remoteAddress;
    }

	public void setRemoteAddress(InetAddress remoteAddress) {
        this.remoteAddress = remoteAddress;
    }

	public Security getSecurity() {
        return this.security;
    }

	public static class Security {

		private String username;

		private String password;

		private List<String> roles = new ArrayList<>(Collections.singleton("USER"));

        public Security() {}

        public Security(String username, String password) {
            setUsername(username);
            setPassword(password);
        }

        public Security(String username, String password, List<String> roles) {
            setUsername(username);
            setPassword(password);
            setRoles(roles);
        }

		public String getUsername() {
            return this.username;
         }

		public void setUsername(String username) {
            this.username = username;
        }

		public String getPassword() {
            return this.password;
        }

		public void setPassword(String password) {
            this.password = password;
        }

		public List<String> getRoles() {
            return this.roles;
        }

		public void setRoles(List<String> roles) {
            this.roles = roles;
        }

	}
}
