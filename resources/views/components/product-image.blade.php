@php
/**
 * Product Image Component
 * Renders a product image with proper URL handling and fallback
 * 
 * @param object $product - The product object
 * @param string $size - Size class (sm, md, lg)
 * @param string $style - Additional CSS styles
 * @param string $class - Additional CSS classes
 */

$imageUrl = null;
$width = $height = 80;
$iconSize = '1rem';

// Set dimensions based on size
switch($size ?? 'md') {
    case 'sm':
        $width = $height = 50;
        $iconSize = '1rem';
        break;
    case 'md':
        $width = $height = 80;
        $iconSize = '1.5rem';
        break;
    case 'lg':
        $width = $height = 200;
        $iconSize = '3rem';
        break;
    case 'xl':
        $width = $height = 300;
        $iconSize = '4rem';
        break;
}

// Determine image URL
if ($product->image) {
    if (filter_var($product->image, FILTER_VALIDATE_URL)) {
        $imageUrl = $product->image;
    } else {
        $imageUrl = asset('storage/' . $product->image);
    }
}

$containerStyle = "width: {$width}px; height: {$height}px; " . ($style ?? '');
$containerClass = "rounded d-flex align-items-center justify-content-center " . ($class ?? '');
@endphp

@if($imageUrl)
    <img src="{{ $imageUrl }}" 
         class="{{ $containerClass }}" 
         alt="{{ $product->name }}"
         style="{{ $containerStyle }} object-fit: cover;"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <div class="bg-light {{ $containerClass }}" 
         style="{{ $containerStyle }} display: none;">
    </div>
@else
    <div class="bg-light {{ $containerClass }}" 
         style="{{ $containerStyle }}">
    </div>
@endif
