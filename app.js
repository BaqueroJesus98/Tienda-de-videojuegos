
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

const PRODUCTS = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    price: 59.99,
    image: 'https://media.vandal.net/i/1280x720/5-2023/20235223395250_1.jpg',
    alt: 'Carátula del videojuego The Legend of Zelda: Breath of the Wild con paisaje verde y personaje principal',
    description: 'Aventúrate en un mundo abierto y descubre secretos en esta épica aventura de Zelda.',
    reviews: [
      { id: 'r1', user: 'Ana', rating: 5, comment: 'Juego espectacular, me encantó cada minuto.' },
      { id: 'r2', user: 'Carlos', rating: 4, comment: 'Muy bueno, aunque esperaba más retos.' },
    ],
  },
  {
    id: '2',
    title: 'Super Mario Odyssey',
    price: 49.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6PdNYIYdX1nnhvn1XVMKt3_qJxR5pMpXLfw&s',
    alt: 'Carátula del videojuego Super Mario Odyssey con Mario saltando en un fondo de ciudad',
    description: 'Viaja por mundos mágicos con Mario y su sombrero amigo en esta aventura 3D.',
    reviews: [
      { id: 'r3', user: 'Lucia', rating: 5, comment: 'El mejor juego para toda la familia.' },
      { id: 'r4', user: 'Javier', rating: 5, comment: 'Divertido y muy creativo, recomendado.' },
    ],
  },
  {
    id: '3',
    title: 'Cyberpunk 2077',
    price: 39.99,
    image: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch-2/70010000095547/f172668ac499434b33917199f2021f753d42b73862d76d3c93d04a474dade847',
    alt: 'Carátula del videojuego Cyberpunk 2077 con personaje futurista y neones',
    description: 'Explora Night City en una aventura cyberpunk llena de acción y decisiones difíciles.',
    reviews: [
      { id: 'r5', user: 'Marta', rating: 3, comment: 'Gráficos geniales pero con bugs al inicio.' },
      { id: 'r6', user: 'Pedro', rating: 4, comment: 'Historia atrapante y mundo abierto interesante.' },
    ],
  },
  {
    id: '4',
    title: 'God of War',
    price: 29.99,
    image: 'https://cdn1.epicgames.com/offer/3ddd6a590da64e3686042d108968a6b2/EGS_GodofWar_SantaMonicaStudio_S2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1200x1600-fbdf3cbc2980749091d52751ffabb7b7',
    alt: 'Carátula del videojuego God of War con guerrero y hacha en un fondo oscuro',
    description: 'Únete a Kratos en una aventura épica llena de mitología y batallas intensas.',
    reviews: [
      { id: 'r7', user: 'Luis', rating: 5, comment: 'Intenso y emocionante, excelente narración.' },
      { id: 'r8', user: 'Sofia', rating: 5, comment: 'Juego que todo fan de acción debe jugar.' },
    ],
  },
  {
    id: '5',
    title: 'Minecraft',
    price: 26.95,
    image: 'https://xboxwire.thesourcemediaassets.com/sites/4/15YR_Free_Cape-1-7cbcb0739e3df57534ec-9063efed017354d1b1c3.jpg',
    alt: 'Carátula del videojuego Minecraft mostrando mundo cubico pixelado',
    description: 'Construye y explora un mundo infinito en este sandbox creativo y divertido.',
    reviews: [
      { id: 'r9', user: 'Diego', rating: 5, comment: 'Creatividad sin límites, juego de horas.' },
      { id: 'r10', user: 'María', rating: 4, comment: 'Perfecto para todas las edades.' },
    ],
  },
];

// Productos destacados IDs (pueden ser primeros 3)
const FEATURED_IDS = ['1', '2', '3'];

function StarRating({ rating }) {
  // Renders 5 stars with filled and empty based on rating
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((_, i) => (
        <MaterialIcons
          key={i}
          name={i < rating ? 'star' : 'star-border'}
          size={18}
          color="#facc15"
          accessibilityLabel={`${i < rating ? 'Estrella llena' : 'Estrella vacía'}`}
        />
      ))}
    </View>
  );
}

function HomeScreen({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, setCart } = route.params;

  const filteredProducts = PRODUCTS.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filtrar productos destacados
  const featuredProducts = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));

  function addToCart(product) {
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === product.id);
      if (found) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    Alert.alert('Añadido', `"${product.title}" ha sido añadido al carrito.`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton} accessibilityLabel="Abrir menú">
          <MaterialIcons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tienda de Videojuegos</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Carrito')}
          accessibilityLabel="Ir al carrito"
        >
          <MaterialIcons name="shopping-cart" size={28} color="#333" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.reduce((sum, item) => sum + item.quantity, 0)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Buscar productos..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          accessibilityLabel="Buscar productos"
          clearButtonMode="while-editing"
        />
      </View>

      <Text style={styles.sectionTitle}>Productos Destacados</Text>
      <FlatList
        data={featuredProducts}
        horizontal
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.featuredCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.featuredImage}
              accessibilityLabel={item.alt}
              resizeMode="cover"
            />
            <Text numberOfLines={1} style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.featuredButton}
              onPress={() => navigation.navigate('DetallesProducto', { product: item })}
              accessibilityLabel={`Ver detalles de ${item.title}`}
            >
              <Text style={styles.featuredButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Todos los Productos</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              accessibilityLabel={item.alt}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <View style={{flexDirection:'row', flexWrap:'nowrap', justifyContent:'flex-start', gap: 8}}>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => addToCart(item)}
                  accessibilityLabel={`Agregar ${item.title} al carrito`}
                >
                  <Text style={styles.addToCartText}>Agregar al carrito</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addToCartButton, styles.detailsButton]}
                  onPress={() => navigation.navigate('DetallesProducto', { product: item })}
                  accessibilityLabel={`Ver detalles de ${item.title}`}
                >
                  <Text style={styles.addToCartText}>Ver detalles</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResultsText}>No se encontraron productos</Text>}
      />
    </SafeAreaView>
  );
}

function DetallesProductoScreen({ navigation, route }) {
  const { product } = route.params;
  const { cart, setCart } = route.params || {};

  // Si cart o setCart no llegan por params, se mantienen para agregar al carrito
  // Para asegurar que se pueda agregar sin error:
  function addToCart(product) {
    if (!setCart) return;
    setCart(prevCart => {
      const found = prevCart.find(item => item.id === product.id);
      if (found) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    Alert.alert('Añadido', `"${product.title}" ha sido añadido al carrito.`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton} accessibilityLabel="Volver">
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Producto</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Image
          source={{ uri: product.image }}
          style={styles.detailImage}
          accessibilityLabel={product.alt}
          resizeMode="cover"
        />
        <Text style={styles.detailTitle}>{product.title}</Text>
        <Text style={styles.detailPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.detailDescription}>{product.description}</Text>
        <TouchableOpacity
          style={[styles.addToCartButton, { marginTop: 16, alignSelf: 'center' }]}
          onPress={() => addToCart(product)}
          accessibilityLabel={`Agregar ${product.title} al carrito`}
        >
          <Text style={styles.addToCartText}>Agregar al carrito</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Reseñas</Text>
        {product.reviews.length === 0 && <Text style={{ color: '#666' }}>No hay reseñas.</Text>}
        {product.reviews.map(review => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ fontWeight: '700', marginRight: 8 }}>{review.user}</Text>
              <StarRating rating={review.rating} />
            </View>
            <Text style={{ color: '#444', fontStyle: 'italic' }}>{`"${review.comment}"`}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MetodoPagoScreen({ navigation, route }) {
  const { cart, setCart } = route.params;

  const paymentMethods = [
    { id: 'card', label: 'Tarjeta de crédito / débito', icon: 'credit-card' },
    { id: 'paypal', label: 'PayPal', icon: 'account-balance-wallet' },
    { id: 'other', label: 'Otras opciones', icon: 'payment' },
  ];

  function handleSelectMethod(method) {
    navigation.navigate('ConfirmacionCompra', { method });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuButton} accessibilityLabel="Volver">
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Opciones de Pago</Text>
      </View>

      <View style={{ padding: 16 }}>
        {paymentMethods.map(pm => (
          <TouchableOpacity
            key={pm.id}
            style={styles.paymentMethodButton}
            onPress={() => handleSelectMethod(pm.label)}
            accessibilityLabel={`Seleccionar método de pago: ${pm.label}`}
          >
            <MaterialIcons name={pm.icon} size={28} color="#2854d5" style={{ marginRight: 12 }} />
            <Text style={styles.paymentMethodText}>{pm.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ConfirmacionCompraScreen({ navigation, route }) {
  const { method } = route.params;

  function handleFinish() {
    Alert.alert('Compra finalizada', 'Gracias por su compra. ¡Que disfrute su producto!');
    navigation.navigate('Inicio');
  }

  return (
    <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 30 }]}>
      <MaterialIcons name="check-circle" size={96} color="#28d5a8" />
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 20, textAlign: 'center', color: '#222' }}>
        Confirmación de compra
      </Text>
      <Text style={{ fontSize: 18, marginTop: 12, color: '#444', textAlign: 'center' }}>
        Método de pago seleccionado:
      </Text>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#2854d5', marginTop: 8, textAlign: 'center' }}>{method}</Text>
      <TouchableOpacity
        style={[styles.checkoutButton, { marginTop: 40, paddingHorizontal: 40 }]}
        onPress={handleFinish}
        accessibilityLabel="Finalizar compra"
      >
        <Text style={styles.checkoutButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function CartScreen({ navigation, route }) {
  const { cart, setCart } = route.params;

  function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }

  function totalItems() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  function totalPrice() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} accessibilityLabel={item.alt} />
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.cartItemPrice}>Precio unitario: ${item.price.toFixed(2)}</Text>
        <Text style={styles.cartItemTotal}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromCart(item.id)}
          accessibilityLabel={`Eliminar ${item.title} del carrito`}
        >
          <Text style={styles.removeButtonText}>Eliminar producto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton} accessibilityLabel="Abrir menú">
          <MaterialIcons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrito de Compras</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <MaterialIcons name="shopping-cart" size={64} color="#999" />
          <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
        </View>
      ) : (
        <>
          <Text style={styles.cartSummary}>
            Artículos: <Text style={{ fontWeight: '700' }}>{totalItems()}</Text>{' '}
            | Total: <Text style={{ fontWeight: '700' }}>${totalPrice().toFixed(2)}</Text>
          </Text>

          <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            contentContainerStyle={styles.cartList}
          />
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('MetodoPago', { cart, setCart })}
            accessibilityLabel="Proceder al método de pago"
          >
            <Text style={styles.checkoutButtonText}>Comprar</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menú</Text>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate('Inicio');
          navigation.closeDrawer();
        }}
        accessibilityLabel="Ir a Inicio"
      >
        <MaterialIcons name="home" size={24} color="#333" style={styles.drawerIcon} />
        <Text style={styles.drawerText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate('Carrito');
          navigation.closeDrawer();
        }}
        accessibilityLabel="Ir al carrito"
      >
        <MaterialIcons name="shopping-cart" size={24} color="#333" style={styles.drawerIcon} />
        <Text style={styles.drawerText}>Ir al carrito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.drawerItem, styles.drawerCloseItem]}
        onPress={() => navigation.closeDrawer()}
        accessibilityLabel="Cerrar menú"
      >
        <MaterialIcons name="close" size={24} color="#c00" style={styles.drawerIcon} />
        <Text style={[styles.drawerText, { color: '#c00' }]}>Cerrar menú</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
        }}
      >
        <Drawer.Screen name="Inicio">
          {props => <HomeScreen {...props} cart={cart} setCart={setCart} route={{...props.route, params: {cart, setCart}}} />}
        </Drawer.Screen>
        <Drawer.Screen name="Carrito">
          {props => <CartScreen {...props} cart={cart} setCart={setCart} route={{...props.route, params: {cart, setCart}}} />}
        </Drawer.Screen>
        <Drawer.Screen name="DetallesProducto">
          {props => {
            const { product } = props.route.params;
            return (
              <DetallesProductoScreen
                {...props}
                product={product}
                cart={cart}
                setCart={setCart}
                route={{ ...props.route, params: { product, cart, setCart } }}
              />
            );
          }}
        </Drawer.Screen>
        <Drawer.Screen name="MetodoPago">
          {props => <MetodoPagoScreen {...props} cart={cart} setCart={setCart} route={{ ...props.route, params: { cart, setCart } }} />}
        </Drawer.Screen>
        <Drawer.Screen name="ConfirmacionCompra" component={ConfirmacionCompraScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#2854d5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28d5a8',
    flex: 1,
  },
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    backgroundColor: '#6b58d8',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#58d879',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#58d879',
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#58d879',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ee3b3b',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  detailsButton: {
    backgroundColor: '#2854d5',
    marginLeft: 12,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
    color: '#999',
  },
  cartButton: {
    marginLeft: 'auto',
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: '900',
    paddingLeft: 20,
    marginBottom: 40,
    color: '#222',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerIcon: {
    marginRight: 20,
  },
  drawerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  drawerCloseItem: {
    borderBottomWidth: 0,
    marginTop: 40,
  },
  cartSummary: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    marginVertical: 12,
    color: '#111',
  },
  cartList: {
    paddingHorizontal: 16,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: 'row',
    padding: 16,
    elevation: 2,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  cartItemTotal: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700',
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  checkoutButton: {
    backgroundColor: '#28d5a8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    margin: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  featuredCard: {
    backgroundColor: '#daf4fa',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 140,
    alignItems: 'center',
    elevation: 3,
  },
  featuredImage: {
    width: 120,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2854d5',
  },
  featuredPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginVertical: 4,
  },
  featuredButton: {
    backgroundColor: '#2854d5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  featuredButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  detailImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#2854d5',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#28d5a8',
    marginBottom: 12,
  },
  detailDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  reviewItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2854d5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  paymentMethodText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2854d5',
  },
});


