package phoneemulator;
/**
 * CallExcpetions are used to indicate when an error
 * has occered while attempting to send a CallEvent<br>
 * 
 * In SimplePhone CallExceptions will be thrown when
 * ever someone tries to send a call to a phone
 * which is already in the middel of a call.<br>
 * 
 * The CallExcpetion message should be used to provide
 * useful information as to why the Exception occered.<br>
 * 
 * @author Daniel J. Caruso
 *
 */
public class CallException extends Exception {

	CallException(String message)
	{
		super(message);
	}
}
