# How to Add Your Photos to Baho Coffee Website

## 📁 Folder Structure

Place your photos in the `public` folder with the following structure:

```
public/
├── hero/
│   ├── hero-1.jpg
│   ├── hero-2.jpg
│   └── hero-3.jpg
├── products/
│   ├── humure-washed.jpg
│   ├── fugi-washed.jpg
│   ├── gitoki-natural.jpg
│   └── ... (one for each product)
├── washing-stations/
│   ├── humure.jpg
│   ├── fugi.jpg
│   ├── gitoki.jpg
│   └── ... (one for each washing station)
└── general/
    ├── story-image.jpg
    └── ... (other general images)
```

## 📸 Photo Requirements

### Hero Images (Homepage Slider)
- **Location**: `public/hero/`
- **Names**: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`
- **Recommended Size**: 1920x1080px (16:9 aspect ratio)
- **Format**: JPG or PNG
- **Content**: Coffee farms, processing, or beautiful coffee scenes

### Product Images
- **Location**: `public/products/`
- **Naming**: Use the product slug (e.g., `humure-washed.jpg`, `bugoyi-natural.jpg`)
- **Recommended Size**: 800x800px (square)
- **Format**: JPG or PNG
- **Content**: Coffee beans, roasted coffee, or product packaging

### Washing Station Images
- **Location**: `public/washing-stations/`
- **Naming**: Use the station slug (e.g., `humure.jpg`, `fugi.jpg`)
- **Recommended Size**: 1200x800px (3:2 aspect ratio)
- **Format**: JPG or PNG
- **Content**: Washing station facilities, coffee processing, or station views

## 🚀 Quick Start

1. Create the folders in `public/`:
   ```
   public/hero/
   public/products/
   public/washing-stations/
   ```

2. Add your photos with the correct names

3. The website will automatically use them!

## 📝 Current Image References

The website currently looks for:
- Hero images: `/hero-1.jpg`, `/hero-2.jpg`, `/hero-3.jpg`
- Product images: Based on product slug (e.g., `/products/humure-washed.jpg`)
- Washing station images: Based on station slug (e.g., `/washing-stations/humure.jpg`)

## 💡 Tips

- Optimize images before uploading (use tools like TinyPNG or ImageOptim)
- Keep file sizes under 500KB for faster loading
- Use descriptive filenames
- Maintain consistent aspect ratios for better display

