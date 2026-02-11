# Troubleshooting MongoDB Connection

If you are seeing errors like `querySrv ECONNREFUSED` or `MongoDB connection error`, follow these steps to resolve the issue.

## 1. Check Your IP Address in MongoDB Atlas
The most common cause of connection issues is that your current IP address is not allowed to access the database.

1.  Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2.  Go to the **Network Access** tab (under Security in the left sidebar).
3.  Check if your current IP address is listed as "Active".
4.  If not (or if you are unsure):
    *   Click **+ Add IP Address**.
    *   Click **Add Current IP Address** (to allow your local machine).
    *   **OR** Click **Allow Access from Anywhere** (0.0.0.0/0) if you want to allow all connections (easier for testing/dynamic IPs, but less secure).
    *   Click **Confirm**.
5.  Wait a minute for the changes to deploy, then try restarting the server.

## 2. Verify Environment Variables
Ensure your `.env` file contains the correct `MONGO_URI`.

1.  Open the `.env` file in the `server` directory.
2.  Look for `MONGO_URI=...`.
3.  It should look like:
    ```
    mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/stayspace?retryWrites=true&w=majority
    ```
4.  **Important:**
    *   Ensure `<username>` and `<password>` are replaced with your actual database user credentials (NOT your Atlas login).
    *   Ensure there are no special characters in the password that need URL encoding.
    *   Ensure the database name (`stayspace`) is correct.

    > [!NOTE]
    > **If you see `MongoServerError: bad auth`**:
    > This means the server reached MongoDB, but the username or password in your `.env` file is incorrect.
    > 1. Double-check the password.
    > 2. Ensure you are using the **Database User** password, NOT your MongoDB Atlas account login password. You can reset this in Atlas under "Database Access".
    > 3. If your password has special characters (like `@`, `:`, etc.), you must URL-encode them (e.g., `@` becomes `%40`).

## 3. Deployment (Render/Vercel) errors
If the error happens on deployment:
*   Make sure you have added `MONGO_URI` to the Environment Variables in your deployment platform settings.
*   In MongoDB Atlas Network Access, you effectively need to use **Allow Access from Anywhere (0.0.0.0/0)** because serverless platforms (like Vercel) and some PAAS (like Render) use dynamic IP addresses that change frequently.

## 4. "Duplicate schema index" Warnings
If you see warnings like:
```
Warning: Duplicate schema index on {"email":1}
```
These are generally harmless warnings from Mongoose indicating it found an index definition that resembles one it already knows about. You can usually ignore these in development.
