# Style Issues Diagnosis & Fix Guide

## Common Style Issues & Solutions

### Issue 1: Tailwind CSS Not Loading
**Symptoms:**
- No styles applied
- Plain HTML without styling
- Classes not working

**Solutions:**
1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Verify globals.css is imported:**
   - Check `app/layout.tsx` line 3: `import "./globals.css";`
   - ✅ Already correct

3. **Verify Tailwind config content paths:**
   - Check `tailwind.config.ts` content array includes all component paths
   - ✅ Already configured correctly

### Issue 2: Styles Not Updating After Changes
**Symptoms:**
- Changes to CSS not reflecting
- Old styles still showing

**Solutions:**
1. **Hard refresh browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```
3. **Restart dev server:**
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Issue 3: Dark Mode Styles Not Working
**Symptoms:**
- Dark mode toggle not changing colors
- Styles stuck in one mode

**Solutions:**
1. **Check ThemeProvider is wrapping app:**
   - ✅ Already in `app/layout.tsx`
2. **Verify dark mode class on html:**
   - ThemeProvider should add `dark` class to `<html>` element
3. **Check Tailwind darkMode config:**
   - ✅ Set to `"class"` in `tailwind.config.ts`

### Issue 4: Custom Colors Not Working
**Symptoms:**
- `primary-*` or `coffee-*` colors not applying
- Custom colors showing as default

**Solutions:**
1. **Verify Tailwind config has custom colors:**
   - ✅ `primary` and `coffee` colors defined
2. **Check content paths include all files:**
   - ✅ All paths configured
3. **Rebuild:**
   ```bash
   npm run build
   ```

### Issue 5: Fonts Not Loading
**Symptoms:**
- Fonts not changing
- Default system fonts showing

**Solutions:**
1. **Check font variables in layout:**
   - ✅ Fonts configured in `app/layout.tsx`
2. **Verify CSS variables:**
   - ✅ Defined in `globals.css`
3. **Check font-family in Tailwind config:**
   - ✅ Configured correctly

### Issue 6: Footer Styles Not White
**Symptoms:**
- Footer text not white
- Footer links not white

**Solutions:**
1. **Check globals.css footer rules:**
   - ✅ Footer styles with `!important` already in place
2. **Verify specificity:**
   - ✅ High specificity selectors used

## Quick Fix Commands

### Complete Style Reset:
```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear Next.js cache
rm -rf .next

# 3. Clear node_modules cache (if needed)
rm -rf node_modules/.cache

# 4. Rebuild
npm run build

# 5. Start dev server
npm run dev
```

### Verify Style Configuration:
```bash
# Check if Tailwind is installed
npm list tailwindcss

# Check if PostCSS is configured
cat postcss.config.mjs

# Check if globals.css exists
ls app/globals.css
```

## Current Configuration Status

✅ **globals.css**: Exists and properly configured
✅ **tailwind.config.ts**: Properly configured with all content paths
✅ **postcss.config.mjs**: Properly configured
✅ **app/layout.tsx**: Imports globals.css correctly
✅ **Fonts**: Configured correctly
✅ **Dark Mode**: Configured correctly
✅ **Custom Colors**: Defined in Tailwind config

## If Styles Still Don't Work

1. **Check browser console for errors:**
   - Open DevTools (F12)
   - Check Console tab for CSS errors
   - Check Network tab for CSS file loading

2. **Verify CSS is being generated:**
   - Check `.next/static/css/` directory
   - Should contain CSS files

3. **Check for conflicting styles:**
   - Look for inline styles overriding Tailwind
   - Check for conflicting CSS files

4. **Verify Tailwind classes are being used:**
   - Check components use Tailwind classes (e.g., `className="bg-white"`)
   - Not plain CSS classes

5. **Check for build errors:**
   ```bash
   npm run build
   ```
   - Look for CSS-related errors

## Testing Styles

1. **Test basic Tailwind classes:**
   ```tsx
   <div className="bg-red-500 p-4 text-white">
     Test
   </div>
   ```
   - Should show red background

2. **Test custom colors:**
   ```tsx
   <div className="bg-primary-500 text-white p-4">
     Test Primary
   </div>
   ```
   - Should show green background

3. **Test dark mode:**
   - Toggle dark mode
   - Check if colors change

## Next Steps

If issues persist after trying these solutions:

1. **Check specific component:**
   - Which component has style issues?
   - What styles are not working?

2. **Check browser:**
   - Which browser?
   - Any browser extensions blocking CSS?

3. **Check environment:**
   - Development or production?
   - Any build errors?

4. **Provide details:**
   - Screenshot of issue
   - Browser console errors
   - Specific component/page with issue

