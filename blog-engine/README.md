# Dokumentáció - Leírás

**A következő leírás a Backend projektet szemlélteti.**

## Entitások

- User
    - id: number
    - name: string
    - role: UserRole
    - username: string
    - password: string
    - labelTypes: LabelType []
    - posts: Post []
    - comments: Comment []
    - approvedPosts: []

- Post
    - id: number
    - ownerUser: User
    - approverUser: User
    - status: PostStatus
    - context: string
    - comments: Comment []  
    - labelTypes: LabelType []
   
- LabelType
    - id: number
    - ownerUser: User
    - posts: Post []  
    - type: string

- Comment
    - id: number
    - ownerUser: User
    - post: Post
    - message: string


### Entitások funkcionális követelménye
<br>
Két féle jogú User-t különböztetünk meg, ADMIN-t és USER-t. <br> 
<br>
Egy user jogkörrel rendelkező user az oldalra való bejelentkezéskor látja a közös hírfolyamot amelyet más userek bejegyzéseit is tartalmazza. A profil oldalán megtekintheti saját bejegyzéseit, szerkesztheti őket. A hírfolyamon és a profil oldalán is létrehozhat új bejegyzést. Egy bejegyzés létrehozásakor a szöveg megírásán kívül, checkboxok közül ki kell választania hogy milyen típusú TypeLabel tartozik a bejegyzéséhez, például egy irodalomhoz kapcsolodó bejegyzéshez kiválaszthatja a <b>book</b> típust vagy akár többet is.
  <br>
Egy admin user látja mind azt amit egy más user is, azonban, csak ő tud új LabelTypeot felvenni és mielőtt megjelenik a hírfolyamban egy user bejegyzése, neki azt jóvá kell hagynia, tehát van egy  felülelete a bejegyzések elfogadására, ekkor a bejegyzés-Post állapota PENDING-ről VISIBLE-re áll át.
<br>
A bejegyzésekhez kommentek írhatóak, ezek automatikusan megjelennek.

### Entitás kapcsolatok

- USER - POST: 1 - N
- POST - TypeLabel N - N
- POST - COMMENT 1 - N

### ER diagram

![ER](https://user-images.githubusercontent.com/49908371/149134252-be9d6e6a-caf0-4c12-a721-dd9e6439672d.jpg)


### USE CASE diagram


![USECASE](https://user-images.githubusercontent.com/49908371/149137133-0b9982fa-bac3-4168-ac1e-a0df6ea65327.png)


## Végpont tervek

### User


POST /user - Regisztráció
</br>
 -     params: 
        Regisztráló user alap adatai, UserAuthDto
 -     returns:
        200: A létrehozott User entitás
        409: Conflict, A megadott username foglalt
   </br>    
   
  POST /user/login - Bejelentkezés
  </br>
 -     params:
          User adatok
 -     returns:
          200: belépett user, access token
          
          
          
 ### Post
 
 
 POST /post - Létrehozás
</br>
 -     params: 
        PostDto, Poszt adatok
 -     returns:
        200: A létrehozott Post entitás
        
   </br>    
   
  GET /post - Összes lekérése
  </br>
 -     params:
          ''
 -     returns:
          200: Összes poszt
          
 </br>
 
 GET /post/owmer - Lekérdezés tulajdonos alapján
 </br>
 -     params: 
        UserDto, a poszt létrhozója
 -     returns:
        200: A lekérdező user által létrehozott posztok
        
   </br>    
   
  GET /post/:id - Egy bizonyos poszt lekérdezése id alapján
  </br>
 -     params:
          poszt ID
 -     returns:
          200: Megadott ID-u poszt      
          
                 
  </br>    
   
  PATCH /post/:id - Egy megadott poszt frissítése
  </br>
 -     params:
          poszt ID, új poszt Dto
 -     returns:
          200: Frissített poszt
          
          
  </br>    
   
  DELETE /post/:id - Egy megadott poszt törlése
  </br>
 -     params:
          poszt ID
 -     returns:
          200: törölt poszt
          
          
  ### Comment
  
POST /comment - Létrehozás
</br>
 -     params: 
        CommentDto, Comment adatok
 -     returns:
        200: A létrehozott Comment entitás
        
   </br>    
   
  GET /comment - Összes lekérése
  </br>
 -     params:
          ''
 -     returns:
          200: Összes comment
          
 </br>
 
 GET /comment/:post - Lekérdezés Post alapján
 </br>
 -     params: 
        PostDto, amelyhez a kommenteket látni akarjuk.
 -     returns:
        200: A poszthoz tartozó kommentek.
        
   </br>    
   
  GET /comment/:id - Egy bizonyos comment lekérdezése id alapján
  </br>
 -     params:
          comment ID
 -     returns:
          200: Megadott ID-u comment      
          
                 
  </br>    
   
  PATCH /comment/:id - Egy megadott comment frissítése
  </br>
 -     params:
          poszt ID, új comment Dto
 -     returns:
          200: Frissített comment
          
          
  </br>    
   
  DELETE /comment/:id - Egy megadott comment törlése
  </br>
 -     params:
          comment ID
 -     returns:
          200: törölt comment 
          
 
        
  ### LabelType
  
  
  POST /label-type - Létrehozás
</br>
 -     params: 
        labelTypeDto, labelType adatok
 -     returns:
        200: A létrehozott labelType entitás
        
   </br>    
   
  GET /label-type - Összes lekérése
  </br>
 -     params:
          ''
 -     returns:
          200: Összes labelType
          
 </br>
 
 GET /label-type/:post - Lekérdezés Post alapján
 </br>
 -     params: 
        PostDto, amelyhez a labelTypeokat látni akarjuk.
 -     returns:
        200: A poszthoz tartozó labelTypeok.
        
   </br>    
 
 GET /label-type/:owner - Lekérdezés tulajdonos alapján
 </br>
 -     params: 
        UserDto, aki által létre hozott labelTypeokat látni akarjuk
 -     returns:
        200: Userhez tartozó labelTypeok.
        
   </br>  
   
  GET /label-type/:id - Egy bizonyos labelType lekérdezése id alapján
  </br>
 -     params:
          labelType ID
 -     returns:
          200: Megadott ID-u labelType      
          
                 
  </br>    
   
  PATCH /label-type/:id - Egy megadott labelType frissítése
  </br>
 -     params:
          labelType ID, új labelType Dto
 -     returns:
          200: Frissített labelType
          
          
  </br>    
   
  DELETE /label-type/:id - Egy megadott labelType törlése
  </br>
 -     params:
          labelType ID
 -     returns:
          200: törölt labelType
    















