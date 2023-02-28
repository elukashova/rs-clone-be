### **Примеры запросов** к беку через Postman:

1. Получение информации о добавленной спортивной активности
    - **Url**: [https://the-big-bug-theory-be.onrender.com/activity/1](https://the-big-bug-theory-be.onrender.com/activity/1)
    - Номер 1 в конце url является id активности. На момент сабмита задания, на платформу добавлено минимум 10 тестовых активностей, поэтому вместо id можно подставить любое число от 1 до 10.
    - **Метод**: GET
    - **Пример ответа**:
        
        ```json
          {
          	  "id": 1,
              "time": "01:11",
              "date": "2023-02-28T00:00:00.000Z",
              "title": "Night walk",
              "elevation": "36",
              "duration": "00:52:09",
              "sport": "walking",
              "description": null,
              "distance": "4.2",
              "companionId": null,
              "kudos": [
                  "6069ec27-2cbe-44c9-9d12-880058a1e648",
                  "a689f25f-f753-4212-bb2e-25a877a858e9"
              ],
              "comments": [
                  {
                      "body": "niceeee :)",
                      "createdAt": "2023-02-28T00:20:33.802Z",
                      "updatedAt": "2023-02-28T00:20:33.802Z",
                      "avatarUrl": "https://the-big-bug-theory.onrender.com/assets/images/avatars/avatar3.png",
                      "username": "Miss Murple"
                  },
                  {
                      "body": "nicely done!",
                      "createdAt": "2023-02-28T00:52:19.734Z",
                      "updatedAt": "2023-02-28T00:52:19.734Z",
                      "avatarUrl": "https://the-big-bug-theory.onrender.com/assets/images/avatars/avatar6.png",
                      "username": "Arnold Walter"
                  },
                  {
                      "body": "like it!",
                      "createdAt": "2023-02-28T01:13:01.159Z",
                      "updatedAt": "2023-02-28T01:13:01.159Z",
                      "avatarUrl": "https://the-big-bug-theory.onrender.com/assets/images/avatars/default.png",
                      "username": "Mary Poppins"
                  }
              ],
              "route": {
                  "id": 1,
                  "startPoint": "45.48799296265632,9.067521746533185",
                  "endPoint": "45.50505864056653,9.064260180371075",
                  "mapId": "6a951ba9-bde9-42ed-8b29-8aab238d635d",
                  "travelMode": "WALKING"
              }
          }
        
        ```
        


2. Получение информации о пользователе
    - **Url**: [https://the-big-bug-theory-be.onrender.com/auth/me](https://the-big-bug-theory-be.onrender.com/auth/me)
    - **Метод**: GET
    - Для данного запроса **требуется токен JWT**. Вы можете скопировать ваш токен из консоли **после регистрации или входа** в приложение. Он будет выглядеть подобным образом:
        
        ![https://user-images.githubusercontent.com/102854917/221729099-69f9a639-ce2b-4a33-a269-6cc2c9a0cfba.png](https://user-images.githubusercontent.com/102854917/221729099-69f9a639-ce2b-4a33-a269-6cc2c9a0cfba.png)
        
    - Для использования его в запросе Postman, необходимо прописать **его вот тут**:
        - кликаете на Authorization
        - слева выбираете type ‘Bearer Token’
        - копируете ваш токен в поле справа
        - после этого можете смело нажимать на Send
        
        ![https://user-images.githubusercontent.com/102854917/221729430-aa402765-e88f-4719-bdfe-45c187263d9a.png](https://user-images.githubusercontent.com/102854917/221729430-aa402765-e88f-4719-bdfe-45c187263d9a.png)
        
        ```json
        // Пример ответа при первом входе (без добавленных друзей или активностей)
              {
                  "id": "0c83989f-bb1a-423e-86c7-5e2f4dccd071",
                  "username": "Mister Purple",
                  "email": "mister.purple@gmail.com",
                  "country": "Åland Islands",
                  "avatarUrl": "https://the-big-bug-theory.onrender.com/assets/images/avatars/default.png",
                  "bio": null,
                  "sportTypes": [],
                  "challenges": [],
                  "birth": null,
                  "gender": null,
                  "followedBy": [],
                  "following": [],
                  "activities": []
              }
        ```
