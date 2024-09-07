const MakeSlug = (title) => {
    let slug = title.toLowerCase();
    return slug.replaceAll(" ", "-");
}

export {MakeSlug}