// Load all posts
const loadAllPost = async (category = "") => {
 document.getElementById('posts-container').innerHTML = "";
 const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
 const data = await response.json();
 displayAllPosts(data.posts);
}


// Search by category
const searchByCategory = () => {
 const searchText = document.getElementById('search-posts').value;
 loadAllPost(searchText);

}


// Display all posts
const displayAllPosts = (posts) => {
 const postsContainer = document.getElementById('posts-container');
 posts.forEach(post => {
  const div = document.createElement('div');
  div.innerHTML = `
   <div class="flex flex-col md:flex-row space-x-6 space-y-6 items-center p-6 rounded-3xl hover:border-[1px] hover:border-[#797DFC] hover:bg-[#797DFC1A] bg-[#F3F3F5]">
    <div class="indicator">
     <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-500"}"></span>
     <div class="avatar">
      <div class="w-24 h-24 rounded-xl">
      <img
          src=${post.image}
      />
      </div>
     </div>
    </div>
    <!-- Text -->
    <div>
      <div class="flex flex-row space-x-5">
        <p class="text-sm font-medium text-[#12132DCC]"># ${post.category}</p>
        <p class="text-sm font-medium text-[#12132DCC]">
          Author : ${post.author.name}
        </p>
      </div>
      <div
        class="pb-5 space-y-5 border-b-2 border-[#12132D40] border-dashed"
      >
        <h3 class="text-xl font-bold text-[#12132D]">
          ${post.title}
        </h3>
        <p class="text-[#12132D99]">
          ${post.description}
        </p>
      </div>
      <div class="flex flex-row justify-between mt-6 items-center">
        <!-- Statistics -->
        <div class="flex flex-row space-x-8">
          <div class="flex flex-row space-x-4">
            <span
              ><i
                class="fa-regular fa-comment-dots text-[#12132D99]"
              ></i
            ></span>
            <span class="text-[#12132D99]">${post.comment_count}</span>
          </div>
          <div class="flex flex-row space-x-4">
            <span
              ><i class="fa-regular fa-eye text-[#12132D99]"></i
            ></span>
            <span class="text-[#12132D99]">${post.view_count}</span>
          </div>
          <div class="flex flex-row space-x-4">
            <span
              ><i class="fa-regular fa-clock text-[#12132D99]"></i
            ></span>
            <span class="text-[#12132D99]">${post.posted_time}</span>
          </div>
        </div>
        <div>
          <button onclick="markAsRead('${post.title}', '${post.view_count}')" class="btn btn-sm p-2 rounded-full bg-[#10B981] text-white hover:text-[#10B981]"
            ><i
              class="fa-solid fa-envelope-open"
            ></i
          ></button>
        </div>
      </div>
    </div>
   </div>
  `;
  postsContainer.appendChild(div)
 });
}


// Mark as read functionality
const markAsRead = (title, view) => {
 const markAsReadContainer = document.getElementById('mark-as-read');
 const div = document.createElement('div');
 div.innerHTML = `
  <div class="rounded-2xl bg-white flex flex-row justify-between items-center p-4">
   <h5 class="text-[#12132D] font-semibold">
    ${title}
   </h5>
   <div class="flex flex-row space-x-4">
     <span
       ><i class="fa-regular fa-eye text-[#12132D99]"></i
     ></span>
     <span class="text-[#12132D99]">${view}</span>
   </div>
  </div>
 `;
 markAsReadContainer.appendChild(div);

 markAsReadCounter();
}


// Mark as read count
const markAsReadCounter = () => {
 const markAsReadText = document.getElementById('markAsReadCounter').innerText;
 const markAsReadNumber = parseInt(markAsReadText);
 const sum = markAsReadNumber + 1;
 document.getElementById('markAsReadCounter').innerText = sum;
}


// Load latest posts
const loadLatestPosts = async () => {
 const loader = document.getElementById('latestPostLoader');
 loader.classList.remove('hidden')
 const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
 const data = await response.json();
 const timeOutPromise = new Promise (resolve => setTimeout(resolve, 3000));
 await timeOutPromise;
 displayLatestPosts(data);
 loader.classList.add('hidden');
}


// Display latest posts
const displayLatestPosts = (posts) => {
 const latestPostsContainer = document.getElementById('latest-posts-container');
 posts.forEach(post => {
  const div = document.createElement('div');
  div.innerHTML=`
   <div
    class="p-6 border-[1px] border-[#12132D26] rounded-3xl flex flex-col items-center justify-center space-y-5">
    <div><img class="rounded-[20px]" src="${post.cover_image}" alt="" /></div>
    <!-- Text -->
    <div>
      <div class="flex flex-row space-x-4 items-center">
        <span
          ><i class="fa-regular fa-calendar text-[#12132D99]"></i
        ></span>
        <p class="text-[#12132D99]">${post.author?.posted_date || "No Publish Date"}</p>
      </div>
      <div class="space-y-3">
        <h5 class="text-lg font-extrabold">
          ${post.title}
        </h5>
        <p class="text-[#12132D99]">
          ${post.description}
        </p>
      </div>
      <div class="flex flex-row items-center mt-6 space-x-3">
         <div class="avatar">
          <div class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
           <img
           src=${post.profile_image}
           />
          </div>
        </div>
        <div>
          <h6 class="font-bold">${post.author.name}</h6>
          <p class="text-[#12132D99]">${post.author?.designation || "Unknown"}</p>
        </div>
      </div>
    </div>
   </div>
  `;
  latestPostsContainer.appendChild(div);
 });
}

loadAllPost();
loadLatestPosts();