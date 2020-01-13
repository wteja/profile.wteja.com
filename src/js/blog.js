import xmljs from 'xml-js';
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const postUrl = "https://cors-anywhere.herokuapp.com/https://medium.com/feed/@wteja";

export default function init() {
    getBlogPosts(3).then(posts => {
        renderPosts(posts);
    });
}

function getBlogPosts(limit = 0) {
    return new Promise((resolve, reject) => {
        fetch(postUrl, {
            'Accept': 'application/json'
        })
            .then(result => {
                return result.text();
            })
            .then(xml => {
                const json = xmljs.xml2js(xml, { compact: true, spaces: 4 });
                let posts = [];

                if (json.rss && json.rss.channel && json.rss.channel.item && json.rss.channel.item.length > 0) {
                    const rawPosts = limit && limit > 0 ? json.rss.channel.item.slice(0, limit) : json.rss.channel.item;
                    posts = rawPosts.map(it => ({
                        title: it.title._cdata.trim(),
                        link: it.link._text.trim(),
                        categories: it.category.map(c => c._cdata.trim()),
                        updated: it["atom:updated"]._text.trim(),
                        creator: it["dc:creator"]._cdata.trim(),
                        thumbnail: getFirstImageFromContent(it["content:encoded"]._cdata),
                        excerpt: getExcerpt(it["content:encoded"]._cdata)
                    }))
                }

                resolve(posts);
            })
            .catch(reject)
    });
}

function renderPosts(posts) {
    const recentPosts = document.getElementById("recent-posts");
    const html = posts.map(post => {
        const d = new Date(post.updated);
        const postUpdated = `${monthNames[d.getMonth()]}, ${('00' + d.getDate()).slice(-2)} ${d.getFullYear()}`;
        const ret = `<div class="post-item">
        <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="post-thumbnail" title="${post.title}">
            <img src="${post.thumbnail}" class="post-thumbnail-image" alt="${post.title}" />
        </a>
        <h3 class="post-title">
            <a href="${post.link}" target="_blank" rel="noopener noreferrer" title="${post.title}">
                ${post.title}
            </a>
        </h3>
        ${post.updated ? `<div class="post-date">${postUpdated}</div>` : ""}
        ${post.excerpt ? `<div class="post-excerpt">${post.excerpt}</div>` : ""}
    </div>`;
        return ret;
    }).join('');
    recentPosts.innerHTML = html;
}

function getFirstImageFromContent(content) {
    const regex = /<img.*?src="(?<url>.*?)".*?\/>/i;
    const matches = content.match(regex);
    return matches && matches.groups ? matches.groups.url : "";
}

function getExcerpt(content, length = 200) {
    const regex = /(<([^>]+)>)/ig;
    const text = content.replace(regex, "");
    return text.length > length ? text.substring(0, length) + " ..." : "";
}