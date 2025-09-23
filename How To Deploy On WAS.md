## How to Deploy on Liberty

1. Ensure Liberty is already installed on your server.

2. Place your WAR file:
   - **Linux/macOS**: `wlp/usr/servers/<server-name>/dropins/yourapp.war`  
   - **Windows**: `wlp\usr\servers\<server-name>\dropins\yourapp.war`

3. Start or restart the server:
   ```bash
   wlp/bin/server start <server-name>
   # or
   wlp/bin/server stop <server-name> && wlp/bin/server start <server-name>
   ```

4. Access the application:  
   Default URL: [http://localhost:9080/yourapp](http://localhost:9080/yourapp)

5. Check the logs if needed:  
   `wlp/usr/servers/<server-name>/logs/messages.log`

   **Tip:**  
   You can also deploy the application in **exploded form** (a folder named `yourapp.war/` inside `dropins/`) to enable hot-reload of individual files.  
   Liberty automatically monitors the `dropins/` directory without requiring changes to `server.xml`.

### How it works
  - Place the .war file (or the exploded .war/ folder) in wlp/usr/servers/<server-name>/dropins/.

  - Liberty automatically scans the folder and deploys it without any additional configuration.

  - The default context root is the WAR file name (for example: myapp.war → /myapp).

  #### Adv
  -  Very fast, good for dev/test
  -  No need to edit server.xml
  -  If file changed, **hot reloaded** will active

  #### Cons
  -  You cannot control details such as the context root, classloader, virtual host, or security role mappings.
  -  All applications are treated the same with the default configuration.
  -  This approach becomes difficult when you have multiple applications that require specific configurations.
---

## Configuring `server.xml`

If you need full control (context root, classloader, security, etc.), declare the application in `server.xml`:

```xml
<!-- wlp/usr/servers/<server-name>/server.xml -->
<server>
  <!-- Select features required by the application -->
  <featureManager>
    <!-- Practical: Jakarta EE Web Profile -->
    <feature>webProfile-10.0</feature>
    <!-- Or granular configuration (choose as needed):
    <feature>servlet-6.0</feature>
    <feature>jsp-3.1</feature>
    <feature>jaxrs-3.1</feature>
    <feature>cdi-4.0</feature>
    <feature>jpa-3.1</feature>
    -->
  </featureManager>

  <!-- HTTP Endpoint -->
  <httpEndpoint id="defaultHttpEndpoint" host="*" httpPort="9080" httpsPort="9443"/>

  <!-- Deploy WAR with a specific context root -->
  <application id="my-app" name="my-app" type="war"
               context-root="/"
               location="apps/my-app.war"/>

  <!-- Optional: enable file monitoring for hot-redeploy -->
  <applicationMonitor updateTrigger="mbean" pollingRate="500ms"/>
</server>
```

Place your WAR file at:  
`wlp/usr/servers/<server-name>/apps/my-app.war`

Then start the server:
```bash
wlp/bin/server start <server-name>
```

Access the application at:  
[http://localhost:9080/](http://localhost:9080/) (since `context-root="/"`).

### How it works

- Place the WAR file in the apps/ directory or another location.
- Then register it in server.xml using the <application> element.

```
<application id="my-app" name="my-app" type="war"
             context-root="/"
             location="apps/my-app.war"/>
```

#### Adv
  - You can configure the context root (for example: /, /api, etc.).
  - You can bind the application to a specific virtual host.
  - You can set the classloader policy or library references.
  - You can combine it with security features, JPA datasources, and other enterprise configurations.
  - More suitable for production environments.

#### Cons
  - You need to edit server.xml (more complex compared to using dropins).
  - It does not support automatic hot-redeploy unless you use <applicationMonitor>.
