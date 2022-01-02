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
