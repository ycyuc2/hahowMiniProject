## 如何執行完成的 package

1. clone 這個 repo
2. cd 至專案資料夾下的 hahow 資料夾
3. 執行 npm i 安裝所有需要安裝的套件
4. 執行 npm start ，將會在瀏覽器中開啟 (localhost:3000)

## 專案的架構，web 的架構邏輯
資料夾結構如下
```
.
|____.DS_Store
|____index.js
|____index.css
|____components
| |____HeroCardView.jsx
| |____HeroView.jsx
| |____HeroListView.jsx
|____App.test.js
|____actions
| |____index.js
| |____actionTypes.js
| |____heroActions.js
|____serviceWorker.js
|____reducers
| |____index.js
|____App.js
|____store
| |____store.js
```
## 所有使用到的第三方 library
1. React
    業界非常常見的 javascript UI library，特殊的 jsx 語法，讓我們就像在 javascript 中撰寫 HTML。其中的 virtual Dom 能夠在資料改變的時候與上一次的 vurtual DOM 做對比，並且僅將需要變化的部分更新，以節省繪製時的效能。

2. Redux
    Redux 則是最常在 React 框架中見到的狀態管理框架，方便我們更改與儲存狀態。
    
3. React-Redux 
    Redux 本身只是狀態管理框架，需要使用 React-Redux 使我們在 component 中可以取得 store 裡的 state。
    
4. React-dom
    能夠將 React 的 component 渲染到實際的 DOM 節點，我們通常可以在 index.js 裡頭看到它。
    
5. redux-thunk
    一個 Redux Middleware ，由於我們沒有辦法在 actionCreator 回傳的 action object 中執行其他的 function，因此需要使用 thunk 讓我們能夠做更多的事情。有了 redux-thunk ，我們便可以在 action 中執行許多非同步的語法如 fetch，在取得並處理資料後，能夠把資料放進另一個 action creator ，並且 dispatch。
    
6. hookrouter
    一個新的 dependencies ，意圖在取代 React Router，它提供了更簡單的使用方法，將 routes 定義為一個 object，其中對應的網址是 Object 的 key，value 則是一個 function，這個 function return 對應要顯示的 component。同樣可以製作巢狀 routing 與參數的傳遞，但在網址的 query 目前支援性不足。
    
7. styled-components
    一個 React 的 UI library，特色是把 HTML 元素用字串模板做出來，就像在製作一個 component，在程式碼中，比起一般 React 的 inline-css 會乾淨許多。由於可以自行命名，因此我們很容易能夠知道這個 Tag 是做什麼的。另外可以將 props 傳入，去改變物件的外觀。
    
## 註解原則與在什麼情況下會寫註解
在每個 component 中，每個區段的開始會寫註解，如：
1. 宣告 styled-components 的時候
2. component 的 view 的開始
3. effects 的開始
4. states 的開始

另外，取得資料的處理時會寫註解，比如 action 取得回來的資料，會在註解中表示將資料處理成什麼樣的格式與長相，方便共同維護的同仁能夠知道我傳了什麼樣的東西去給 reducer。

## 專案中遇到的困難、問題，以及解決的方法

### 英雄列表排版上的選擇

雖然本次的英雄總共只有四位，使用 flex 排版可以良好地符合需求，但是為了配合 rwd ，也就是需求中的如果超出畫面範圍，便要自動向下排列，所以 flex 排版在這個條件下討不到任何優勢。因此這次使用傳統的 float 來達成需求，但不論使用 float 或者 flex，都可能會用到 css 的選擇器，在每列4欄 > 3欄 > 2欄...的排版時要依據各種不同的狀態去調整 margin。

### 使用 function component 與 react hooks

這個專案是我第一次全部使用 function component 與 react hooks 的作品。

在專案的說明中，其中有一項要求是 HeroList 不能在點擊換了網址後重新 render ，這個問題我必須坦白說現在仍然沒有解決。這項需求在以往撰寫 class component 時，搭配 react router 便能夠實現這個需求，類似一般網站的 sidebar 實作的方法。但在這次使用 function component ，每次點擊英雄時，雖然只會在第一次載入時打 api 要英雄列表的資料，但還是會觸發再次 render。

### 英雄總點數分配

在切版前我有幾個關於這個專案的設計想法，最後決定要讓使用者用起來有類似遊戲選角並分配點數的作品。因此在顏色上刻意作成復古遊戲常用的配色，搭配一些簡單的特效，讓它實際上玩起來並不是真的那麼的古早味。

實作時發現英雄的點數不是平均分配的，我最喜歡的角色是來自地獄廚房的夜魔俠，他共有 25 點可分配，但可憐的浩克只有少少的 17 點。這樣的情況下可能會導致使用者不選擇自己最喜歡的英雄，而是選總數值最高的那位。考量了許久，最後將除了剩餘點數外的數值全部以圖形化呈現，並且讓每個英雄的所有點數剛剛好可以將其中一項數值點滿。
